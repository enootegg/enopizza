import { FC } from "react";
import styles from "./styles/Add.module.scss";
import { useState } from "react";
import axios from "axios";
import { domain } from "utils/config";

const Add: FC<{ setClose: any }> = ({ setClose }) => {
  const [file, setFile] = useState<any>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState<any>([]);
  const [extra, setExtra] = useState<any>(null);
  const [extraOptions, setExtraOptions] = useState<any>([]);

  const handleExtraInput = (e: any) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e: any) => {
    setExtraOptions((prev: any) => [...prev, extra]);
  };

  const changePrice = (e: any, index: number) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dgihdj0v0/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };
      // await axios.post("http://localhost:3000/api/products", newProduct);
      await axios.post(`${domain}api/products`, newProduct);
      setClose(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input
            type="file"
            className={styles.input}
            onChange={(e: any) => setFile(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            // type="text"
            className={styles.textarea}
            onChange={(e: any) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              type="number"
              className={`${styles.input} ${styles.inputSmall}`}
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              type="number"
              className={`${styles.input} ${styles.inputSmall}`}
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              type="number"
              className={`${styles.input} ${styles.inputSmall}`}
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              type="text"
              className={`${styles.input} ${styles.inputSmall}`}
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              type="number"
              className={`${styles.input} ${styles.inputSmall}`}
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option: any) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
