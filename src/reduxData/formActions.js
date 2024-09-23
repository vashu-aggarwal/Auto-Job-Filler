export const updateForm=((step, data)=>({
    type: UPDATE_FORM_DATA,
    payload: {step, data}
}))

export const resetData = () => ({
  type: RESET_DATA,
});

export const UPDATE_FORM_DATA= "UPDATE_FORM_DATA"
export const RESET_DATA = 'RESET_DATA';