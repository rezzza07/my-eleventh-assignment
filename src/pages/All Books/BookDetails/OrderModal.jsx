import React, { useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { AuthContext } from "../../../context/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const OrderModal = ({ book }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset, control } = useForm();

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

  const senderRegion = useWatch({
    control,
    name: 'senderRegion',
  });

  const receiverRegion = useWatch({ name: 'receiverRegion', control });

  const districtsByRegion = region =>
    coverage
      .filter(c => c.region === region)
      .map(c => c.district);

  /* ------------------ Submit ------------------ */
  const handleOrder = async data => {
    const orderInfo = {
      bookId: book._id,
      bookName: book.name,
      price: book.price,

      userName: user?.displayName,
      email: user?.email,

      parcelType: data.bookType,
      phone: data.phone,
      receiverPhone: data.receiverPhone,
      address: data.address,
      notes: data.notes,
      region: data.region,
      district: data.district,

      orderStatus: "pending",
      paymentStatus: "unpaid",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/orders", orderInfo);
      if (res.data.insertedId) {
        document.getElementById("order_modal").close();
        Swal.fire("Success", "Order placed successfully!", "success");
        reset();
      }
    } catch {
      Swal.fire("Error", "Failed to place order", "error");
    }
  };

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
                  value="document"
                  defaultChecked
                  {...register("bookType")}
                  className="radio text-secondary"
                />
                Regular
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="non-document"
                  {...register("bookType")}
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
                  {...register("userName")}
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered border-primary w-full"
                />
              </div>


              {/*Sender Email */}
              <div>
                <label className="label text-primary text-[12px] font-semibold">Enter your Email Address</label>
                <input
                  {...register("userEmail")}
                  defaultValue={user?.email}
                  readOnly
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
            <button className="btn btn-primary">Place Order</button>
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
