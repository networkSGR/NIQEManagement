import { Panel, Placeholder, Affix } from 'rsuite';
import React, { useState } from 'react';
import StepHeader from './StepHeader'; // Use your alias or relative path

const ProgressSteps = () => {
  const [step, setStep] = useState(0);

  const onChange = (nextStep) => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  const bodyProps = {
    style: {
      height: '60vh',
    },
  };

  return (
    <Panel className="card" 
    bodyProps={bodyProps}
    header={
        <StepHeader step={step} onNext={onNext} onPrevious={onPrevious} />
    }
    shaded scrollShadow>
      <hr />
      <Panel header={`Step: ${step + 1}`}>
        {/* Placeholder content */}
        {Array(1).fill(<Placeholder.Paragraph />)}
      </Panel>
      <hr />
    </Panel>
  );
};

export default ProgressSteps;
