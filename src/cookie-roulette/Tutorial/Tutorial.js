import './css/tutorial.css';

import React from 'react';
import {inject, observer} from "mobx-react";

import Step_1 from './Step_1/Step';
import Step_2 from './Step_2/Step';
import TutorialRoom from "./TutorialRoom";

function Tutorial({store}) {
  return (
    <section className="tutorial-screen sbg-bottle">
      <TutorialRoom />
      { [<Step_1 />, <Step_2 />][store.tutorial.step] }
    </section>
  );
}

export default inject('store')( observer(Tutorial) );