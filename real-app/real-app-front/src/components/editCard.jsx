import { useState } from "react";
import Joi from "joi";
import PageHeader from "./common/pageHeader";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Input from "./common/input";
import formikValidateUsingJoi from "../utils/formikValidateUsingJoi";
import { useNavigate, useParams } from "react-router-dom";
import cardsService from "../services/cardsService";
import { useEffect } from "react";
import { pickKeys } from "../utils/pickKeys";

const EditCard = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    async function getCard() {
      const { data } = await cardsService.getById(id);

      form.setValues(
        pickKeys(data, [
          "bizName",
          "bizDescription",
          "bizAddress",
          "bizPhone",
          "bizImage",
        ])
      );
    }

    getCard();
  }, [id]);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: formikValidateUsingJoi({
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),
      bizImage: Joi.string().min(11).max(1024).allow("").uri().label("Image"),
    }),
    async onSubmit(values) {
      const { bizImage, ...body } = values;

      if (bizImage) {
        body.bizImage = bizImage;
      }

      try {
        await cardsService.editCard(id, body);
        toast("The card was updated 👏");
        navigate("/my-cards");
      } catch ({ response }) {
        if (response?.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <>
      <PageHeader title="Update Card" description="Update a new card" />

      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          type="text"
          label="Name"
          error={form.touched.bizName && form.errors.bizName}
          {...form.getFieldProps("bizName")}
        />
        <Input
          type="text"
          label="Description"
          error={form.touched.bizDescription && form.errors.bizDescription}
          {...form.getFieldProps("bizDescription")}
        />
        <Input
          type="text"
          label="Address"
          error={form.touched.bizAddress && form.errors.bizAddress}
          {...form.getFieldProps("bizAddress")}
        />
        <Input
          type="text"
          label="Phone"
          error={form.touched.bizPhone && form.errors.bizPhone}
          {...form.getFieldProps("bizPhone")}
        />
        <Input
          type="text"
          label="Image"
          error={form.touched.bizImage && form.errors.bizImage}
          {...form.getFieldProps("bizImage")}
        />

        <div className="my-2">
          <button disabled={!form.isValid} className="btn btn-primary">
            Create Card
          </button>
        </div>
      </form>
    </>
  );
};

export default EditCard;
