import React, { useContext } from "react";
import { useForm, useWatch } from "react-hook-form";

import Swal from "sweetalert2";

import { AuthContext } from "../../../context/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const OrderModal = ({ book }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const regions = [...new Set(coverage.map(c => c.region))];
  const selectedRegion = useWatch({
    control,
    name: "region"
  });



  const { data: coverage = [] } = useQuery({
    queryKey: ['coverage'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/coverage`);
      return res.data;
    }
  })

  const { register, handleSubmit, reset, control } = useForm();



  const handleOrder = async (data) => {
    const orderInfo = {
      bookId: book._id,
      bookName: book.name,
      price: book.price,

      userName: user?.displayName,
      email: user?.email,

      parcelType: data.parcelType,
      phone: data.phone,
      receiverPhone: data.receiverPhone,
      address: data.address,
      notes: data.notes,

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
    } catch (error) {
      Swal.fire("Error", "Failed to place order", "error");
    }
  };

  return (
    <dialog id="order_modal" className="modal">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg">Order Book</h3>

        <form onSubmit={handleSubmit(handleOrder)} className="space-y-4 mt-4">

          {/* Book title */}
          <div>
            <label className="label">Book Title</label>
            <input
              type="text"{...register('bookName')}
              className="input input-bordered border-primary w-full"
              value={book.name}
              placeholder="Parcel Name"
              readOnly />
          </div>

          {/*---------------------User info-------------------*/}

          {/*Name---------------------*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div>
              <label className="label">Your Name</label>
              <input
                type="text"{...register('userName')}
                className="input input-bordered border-primary w-full "
                defaultValue={user?.displayName}
                placeholder="Your Name"
                readOnly
              />
            </div>

            {/*Email---------------------*/}
            <div>
              <label className="label">Your Email</label>
              <input
                type="text"{...register('userEmail')}
                className="input input-bordered border-primary w-full"
                defaultValue={user?.email}
                placeholder="Your Email"
                readOnly
              />
            </div>
          </div>

          {/*Book type---------------------*/}
          <div>
            <label className="label">Parcel Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register("bookType")}
                  value="document"
                  defaultChecked
                  className="radio"
                />
                Document
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  {...register("bookType")}
                  value="non-document"
                  className="radio"
                />
                Non-Document
              </label>
            </div>
          </div>

          {/* Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Your Phone</label>
              <input
                {...register("phone", { required: true })}
                className="input input-bordered border-primary w-full"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className="label">Receiver Phone</label>
              <input
                {...register("receiverPhone", { required: true })}
                className="input input-bordered border-primary w-full"
                placeholder="Receiver phone number"
              />
            </div>
          </div>

          {/* Select Region */}

          <fieldset className="fieldset">
            <label className="label">Your Region</label>

            <select defaultValue="Pick a browser" className="select select-primary">
              <option disabled={true}>Pick a Region</option>
              <option>Chrome</option>
              <option>FireFox</option>
              <option>Safari</option>
            </select>

          </fieldset>

          {/* Address */}
          <div>
            <label className="label">Delivery Address</label>
            <textarea
              {...register("address", { required: true })}
              className="textarea textarea-bordered border-primary w-full"
              placeholder="Full delivery address"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="label">Delivery Notes</label>
            <textarea
              {...register("notes")}
              className="textarea textarea-bordered border-primary w-full"
              placeholder="Any special instructions"
            />
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
