import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";

export class SetClient {
  static readonly type = '[Client] Set';
  constructor(public payload: {}) {}
}

export class ClearClient {
  static readonly type = '[Client] Clear';
  constructor() {}
}

export class ClientStateModel {
  client: Object = {};
}

@Injectable()
@State<ClientStateModel>({
  name: 'client',
  defaults: {
    client: {}
  }
})

export class ClientState {
  @Action(SetClient)
  set({ getState, patchState }: StateContext<ClientStateModel>, {payload}: SetClient) {
    patchState({
      client: payload
    })
  }

  @Action(ClearClient)
  clear({ getState, patchState }: StateContext<ClientStateModel>) {
    patchState({
      client: {}
    })
  }
}
