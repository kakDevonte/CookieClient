import "./css/adult.css";
import React from "react";
import { inject, observer } from "mobx-react";
import { CustomDatePicker } from "./CustomDatePicker";

function Adult({ store }) {
  const isDelete = store.user.data.isDelete;

  const [date, setDate] = React.useState(new Date());
  const [isAdult, setIsAdult] = React.useState(false);
  const [isClick, setIsClick] = React.useState(false);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     console.log(store.user.data);
  //   }, 3000);
  //   // setDate(store.);
  // }, []);

  const onSetDate = (event) => {
    setDate(new Date(event.target.value));
  };

  const getAge = () => {
    let today = new Date();
    let birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setIsAdult(age >= 18);
    setIsClick(true);
    if (age >= 18) {
      store.amplitude.trackTutorialStep("Entered Birth Date");
      store.user.setAdult();
      //store.app.stageLobby();
    }
  };

  return (
    <section className="lobby sbg-bottle">
      <div className="message message-date">
        <header>
          {isClick
            ? "Сервис доступен только\nсовершеннолетним 18+"
            : isDelete
            ? "С возвращением в бутылочку"
            : "Добро пожаловать в бутылочку"}
        </header>
        {!isClick && (
          <span>
            Целуйся и знакомься с теми, на
            <br />
            кого указала бутылочка
          </span>
        )}
      </div>
      <div className="image-date">
        <i className="cookie center-screen" />
        <i className="kiss kiss-one" />
        <i className="kiss kiss-two" />
        <i className="kiss kiss-three" />
        <i className="kiss kiss-four" />
      </div>
      {isClick ? (
        <span className="text-date">
          Возвращайся, когда
          <br />
          подрастёшь ;)
        </span>
      ) : (
        <div>
          <span className="text-date">Укажите дату рождения</span>
          <CustomDatePicker date={date} setDate={setDate} />
          {/*<input className="input-date" type="date" value={toJSONLocal(date)} onChange={onSetDate}/>*/}
          <button className="btn-date" onClick={getAge}>
            {isDelete ? "Восстановить аккаунт" : "Подтвердить"}
          </button>
        </div>
      )}
    </section>
  );
}

export default inject("store")(observer(Adult));
