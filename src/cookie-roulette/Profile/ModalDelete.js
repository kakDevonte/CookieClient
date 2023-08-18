import './css/ModalDelete.css';

import React from 'react';
import {inject, observer} from "mobx-react";
import icon from '../../images/error-icon.png';

const ModalDelete = ({store}) => {
    const [isDelete, setIsDelete] = React.useState(false);

    const deleteProfile = () => {
        store.user.deleteProfile();
    };


    // onClick={(e) => {
    //     if(e.target === e.currentTarget) {
    //         store.profile.toggleModal()
    //     }
    // }}

    return (
        <div  className={"delete-main" + store.profile.stateModal}>
            <div className={"delete-root center-X"}>
                <div className="delete-container">
                    <img className="icon" src={icon} alt=""/>
                    {isDelete
                        ? <span className="text-delete">Если удалить профиль, его нельзя будет вновь восстановить, а все достижения исчезнут. Уверены?</span>
                        :<span>Вы уверены, что хотите<br/>удалить профиль?</span>}
                    {isDelete
                        ? <div className="btns">
                            <button className="btn-delete" onClick={() => deleteProfile()}>Да, удаляю</button>
                            <button className="btn-delete" onClick={() => store.profile.toggleModal()}>Вернуться</button>
                         </div>
                        : <div className="btns">
                            <button className="btn-delete" onClick={() => setIsDelete(true)}>Удалить</button>
                            <button className="btn-delete" onClick={() => store.profile.toggleModal()}>Назад</button>
                    </div>}
                </div>
            </div>
        </div>
    )
};

export default inject('store')( observer(ModalDelete) );
