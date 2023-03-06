import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";

export class SetAccount {
  static readonly type = '[Account] Set';
  constructor(public payload: {}) {}
}

export class ClearAccount {
  static readonly type = '[Account] Clear';
  constructor() {}
}

export class AccountStateModel {
  account: Object = {};
}

@Injectable()
@State<AccountStateModel>({
  name: 'account',
  defaults: {
    account: {}
  }
})

export class AccountState {
  @Action(SetAccount)
  set({ getState, patchState }: StateContext<AccountStateModel>, {payload}: SetAccount) {
    patchState({
      account: payload
    })
  }

  @Action(ClearAccount)
  clear({ getState, patchState }: StateContext<AccountStateModel>) {
    patchState({
      account: {}
    })
  }
}
