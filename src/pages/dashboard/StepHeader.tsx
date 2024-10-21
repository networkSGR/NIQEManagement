import React from 'react';
import { Steps, Panel, ButtonGroup, Button, Stack } from 'rsuite';

const StepHeader = ({ step, onNext, onPrevious }) => (
  <>
    <Stack justifyContent="space-between">
      {step === 3 && (
        <Button appearance="primary" onClick={() => alert('Submitted!')}>
          Submit
        </Button>
      )}
    </Stack>

    <Panel className="card">
      <Steps current={step}>
        <Steps.Item title="Input" description="Description" />
        <Steps.Item title="Review" description="Description" />
        <Steps.Item title="Survey" description="Description" />
        <Steps.Item title="Eksekusi By Mitra" description="Description" />
        <Steps.Item title="TestCom" description="Description" />
        <Steps.Item title="Uji Terima" description="Description" />
      </Steps>
    </Panel>

    <ButtonGroup>
      <Button onClick={onPrevious} disabled={step === 0}>
        Previous
      </Button>
      <Button onClick={onNext} disabled={step === 3}>
        Next
      </Button>
    </ButtonGroup>
  </>
);

export default StepHeader;
