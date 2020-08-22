import { FunctionBlock } from '../function-block-base-classes/function-block';
import { OutputChangedEventHandler } from '@src/events/output-updated-event';

export default class ImpulsRelais extends FunctionBlock<boolean> {
  public input: OutputChangedEventHandler<boolean> = (
    status: boolean,
    inputChanged: boolean,
    cycleNumber: number,
  ) => {
    let outputChanged = false;
    if (inputChanged && status === true) {
      this._state = !this._state;
      outputChanged = true;
    }
    this.notifyListeners(this._state, outputChanged, cycleNumber);
  };

  constructor(initialState: boolean) {
    super();
    this._state = initialState;
  }
}
