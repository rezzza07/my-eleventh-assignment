import React, { } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const OrderModal = ({ book }) => {
  // const { user } = useAuth
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm();

  /* ------------------ Fetch coverage ------------------ */
  const { data: coverage = [] } = useQuery({
    queryKey: ["coverage"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coverage");
      return res.data;
    },
  });

  /* ------------------ Region / District ------------------ */
  const regions = [...new Set(coverage.map(c => c.region))];
  const senderRegion = useWatch({ name: 'senderRegion', control });
  const receiverRegion = useWatch({ name: 'receiverRegion', control });

  const districtsByRegion = region => coverage.filter(c => c.region === region).map(c => c.district);

  /* ------------------ Submit ------------------ */
  const handleOrder = data => {
    const isRegular = data.courierType === "regular";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let deliveryCost = 0;

    if (isRegular) {
      deliveryCost = isSameDistrict ? 1 : 1.50;
    } else {
      deliveryCost = isSameDistrict ? 2 : 2.75;
    }

    const bookPrice = (book?.price) || 0;
    const cost = bookPrice + deliveryCost;

    data.cost = cost;

    Swal.fire({
      title: "Confirm Order",
      html: `
    <p><b>Book Price:</b> $${bookPrice}</p>
    <p><b>Delivery Charge:</b> $${deliveryCost}</p>
    <hr />
    <p><b>Total:</b> $${cost}</p>
  `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Place Order",
      cancelButtonText: "Cancel",

      
      confirmButtonColor: "#003C37",   
      cancelButtonColor: "#D8C8A5",    
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post('/courier', data)
          .then(res => {
            if (res.data.insertedId) {
              navigate('/dashboard/my-orders')
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Order placed successfully! Please Pay!!",
                confirmButtonColor: "#003C37",
              });
            }
          });
      }
    });

  }

  return (
    <dialog id="order_modal" className="modal">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-lg text-primary">Order Book</h3>

        <form onSubmit={handleSubmit(handleOrder)} className="space-y-5 mt-4">

          {/* Book Title */}
          <div>
            <label className="label text-primary">Book Title</label>
            <input
              {...register("bookName")}
              defaultValue={book.name}
              readOnly
              className="input input-bordered border-primary w-full"
            />
          </div>


          {/* Courier Type */}
          <div>
            <label className="label text-primary">Courier Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="regular"
                  defaultChecked
                  {...register("courierType")}
                  className="radio text-secondary"
                />
                Regular
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="express"
                  {...register("courierType")}
                  className="radio text-secondary"
                />
                Express
              </label>
            </div>
          </div>

          {/* Sender & Receiver */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Sender--------------------------------------------------------------*/}
            <div className="space-y-3 border rounded-lg p-4">
              <h4 className="font-semibold text-primary">Sender Details</h4>

              {/*Sender Name */}
              <div>
                <label className="label text-primary text-[12px] font-semibold">Enter your Name</label>
                <input
                  {...register("senderName")}
                  defaultValue={user?.displayName}
                  placeholder="Sender Name"
                  className="input input-bordered border-primary w-full"
                />
              </div>


              {/*Sender Email */}
              <div>
                <label className="label text-primary text-[12px] font-semibold">Enter your Email Address</label>
                <input
                  {...register("senderEmail")}
                  defaultValue={user?.email}
                  placeholder="Sender Email"
                  className="input input-bordered border-primary w-full"
                />
              </div>

              {/* Sender Contact */}
              <div>
                <label className="label text-primary text-[12px] font-semibold">Enter your Contact Number</label>
                <input
                  {...register("phone", { required: true })}
                  className="input input-bordered border-primary w-full"
                  placeholder="Your contact number"
                />
              </div>

              {/* Sender Region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-primary text-[12px]">Select Region</legend>
                <select {...register('senderRegion')} defaultValue="Pick a region" className="select border-primary">
                  <option disabled={true}>Pick a region</option>
                  {
                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                  }
                </select>
              </fieldset>

              {/* Sender District */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-primary text-[12px]">Select District</legend>
                <select {...register('senderDistrict')} defaultValue="Pick a District" className="select border-primary">
                  <option disabled={true}>Pick a District</option>
                  {
                    districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                  }
                </select>

              </fieldset>
              {/* Full Address */}
              <div>
                <label className="label text-primary text-[12px] font-semibold">Enter your Address</label>
                <textarea
                  {...register("address", { required: true })}
                  className="textarea textarea-bordered border-primary w-full"
                  placeholder="Your address in details"
                />
              </div>

            </div>

            {/* Receiver--------------------------------------------------------------*/}
            <div className="space-y-3 border rounded-lg p-4">
              <h4 className="font-semibold text-primary">Receiver Details</h4>

              {/* Receiver Name */}
              <div>
                <label className="label text-primary text-[12px] font-semibold">Enter Receiver's Name</label>
                <input
                  {...register("receiverPhone", { required: true })}
                  className="input input-bordered border-primary w-full"
                  placeholder="Receiver's name"
                />
              </div>

              {/* Receiver Email */}
              <div>
                <label className="label text-primary text-[12px] font-semibold">Enter Receiver's Email Address</label>
                <input
                  {...register("receiverEmail")}
                  placeholder="Receiver's email address"
                  className="input input-bordered border-primary w-full"
                />
              </div>

              {/* Receiver Contact */}
              <div>
                <label className="label text-primary text-[12px] font-semibold">Enter Receiver's Contact Number</label>
                <input
                  {...register("receiverPhone", { required: true })}
                  className="input input-bordered border-primary w-full"
                  placeholder="Receiver's contact number"
                />
              </div>

              {/* Receiver Region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-primary text-[12px]">Select Region</legend>
                <select {...register('receiverRegion')} defaultValue="Pick a region" className="select border-primary">
                  <option disabled={true}>Pick a region</option>
                  {
                    regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                  }
                </select>
              </fieldset>

              {/* Receiver District */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-primary text-[12px]">Select District</legend>
                <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select border-primary">
                  <option disabled={true}>Pick a District</option>
                  {

                    districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                  }
                </select>
              </fieldset>

              {/* Notes */}
              <div>
                <label className="label text-primary text-[12px] font-semibold">Delivery Notes</label>
                <textarea
                  {...register("notes")}
                  className="textarea textarea-bordered border-primary w-full"
                  placeholder="Delivery notes (optional)"
                />
              </div>

            </div>

          </div>

          {/* Actions */}
          <div className="modal-action">
            <input
              type="submit"
              className='btn btn-primary'
              value="Place Order"
              onClick={() => document.getElementById("order_modal").close()}
            />
            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById("order_modal").close()}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </dialog>
  );
};

export default OrderModal;
