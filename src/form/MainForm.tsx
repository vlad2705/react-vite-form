import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

/**
 * Zde vytvořte formulář pomocí knihovny react-hook-form.
 * Formulář by měl splňovat:
 * 1) být validován yup schématem
 * 2) formulář obsahovat pole "NestedFields" z jiného souboru
 * 3) být plně TS typovaný
 * 4) nevalidní vstupy červeně označit (background/outline/border) a zobrazit u nich chybové hlášky
 * 5) nastavte výchozí hodnoty objektem initalValues
 * 6) mít "Submit" tlačítko, po jeho stisku se vylogují data z formuláře:  "console.log(formData)"
 *
 * V tomto souboru budou definovány pole:
 * amount - number; Validace min=0, max=300
 * damagedParts - string[] formou multi-checkboxu s volbami "roof", "front", "side", "rear"
 * vykresleny pole z form/NestedFields
 */

// příklad očekávaného výstupního JSON, předvyplňte tímto objektem formulář
const initialValues = {
  amount: 250,
  allocation: 140,
  damagedParts: ['side', 'rear'],
  category: 'kitchen-accessories',
  witnesses: [
    {
      name: 'Marek',
      email: 'marek@email.cz',
    },
    {
      name: 'Emily',
      email: 'emily.johnson@x.dummyjson.com',
    },
  ],
};

const damagedPartsOptions = ['roof', 'front', 'side', 'rear'];

const validationSchema = Yup.object().shape({
  amount: Yup.number().min(0).max(300),
  damagedParts: Yup.array().of(Yup.string().oneOf(damagedPartsOptions))
});

const MainForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const damagedPartsComponent = damagedPartsOptions.map(option => (
      <div key={option}>
        <input type="checkbox" {...register("damagedParts")} value={option} />
        <label>{option}</label>
      </div>
  ));

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Amount:</label>
          <input className={errors.amount && "error"} {...register("amount")} />
          {errors.amount && <p>{errors.amount.message}</p>}
        </div>

        <div>
          <label>Damaged parts:</label>
          {damagedPartsComponent}
        </div>

        <button type="submit">Submit</button>
      </form>
  )
}

export default MainForm;
