import styled from 'styled-components'
import * as colors from './variables'

// PAGE SECTIONS
export const StyledSection = styled.section`
  position: relative;
  margin-top: 100px;
  background-color: ${colors.overlay};
  border: 3px solid ${colors.prim_color};
  border-top-left-radius: 20px;
  overflow: hidden;
  max-height: 80vh;
  overflow-y: scroll;
  ::-webkit-scrollbar { 
    display: none;
  }
  @media (max-width: 768px) {
    height: auto;
    overflow: auto;
    border: none;
    border-top-left-radius: 0;
  }
`

// MAIN PAGE HEADINGS
export const StyledMainHeading = styled.div`
  // background: ${colors.sec_grad};

  & h1 {
    text-align: center;
    font-size: 30px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
    font-style: italic;
    padding: 10px;
    margin: 0;
    text-shadow: ${colors.text_shadow};
    color: tomato;
  }
`

// MAIN PAGE CONTENT
export const StyledMainContent = styled.div`
  // background: ${colors.ter_grad};
  // padding: 20px;
  `

// FORM
export const StyledForm = styled.div`
  margin: 10px;
  margin-top: 0;
  padding: 10px;
  background-color: ${colors.backdrop};

  & label p {
    margin: 0;
    font-weight: 100;
    font-size: 15px;
    color: ${colors.prim_light};
    text-transform: uppercase;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  & p {
    margin-top: 5px;
  }

  & input,
  & textarea,
  & select {
    width: 100%;
    margin: 0 auto;
    padding: 8px;
    color: #fefeee;
    background-color: transparent;
    border: 2px solid Aquamarine;
  }

  & input.error-title {
    border: 2px solid ${colors.sec_color};
  }

  & .error-checkbox {
    border: 2px solid ${colors.sec_color};
  }

  & select option {
    background: #ffffff !important;
    color: #000000;
    margin: 8px;
  }

  & label.drop-down {
    position: relative;
    cursor: pointer;

    & span {
      position: absolute;
      top: 0px;
      right: 3px;
      color: ${colors.ter_yellow};
      transform: scaleY(1.8);

      @media (max-width: 768px) {
        top: -3px;
      }
    }
  }

  // CHECK BOXES
  & .contain-checkboxes {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  & .checkboxes {
    flex-basis: 50%;
    @media (max-width: 768px) {
      flex-basis: 50%;
    }
    text-align: left;
    display: block;
    position: relative;
    cursor: pointer;
    user-select: none;
  }

  & .checkboxes label,
  & .checkboxes input {
    display: inline-block;
    color: ${colors.ter_yellow};
    margin-left: 10px;
  }

  & .checkboxes input {
    position: absolute;
    right: -20px;
    top: 3px;
    opacity: 0;
    cursor: pointer;
  }

  & .checkboxes .checkmark {
    position: absolute;
    top: -4px;
    right: 45px;
    @media (max-width: 768px) {
      top: -4px;
      right: 35px;
    }
    opacity: 1;
    height: 25px;
    width: 25px;
    background-color: ${colors.prim_light};
    pointer-events: none;
  }

  & .checkboxes .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid ${colors.prim_font};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  & .checkboxes .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  & .checkboxes:hover input ~ .checkmark {
    background-color: ${colors.ter_yellow};
  }
  & .checkboxes input:checked ~ .checkmark {
    background-color: ${colors.prim_color};
  }

  & .checkboxes input:checked ~ .checkmark:after {
    display: block;
  }

  & *::placeholder  {
    color: #fefeee;
  }
`

// BUTTON
export const StyledButton = styled.button`
  width: 100%;
  margin-top: 20px;
  outline: none;
  border: none;
  padding: 10px;
  font-weight: 100;
  font-size: 25px;
  text-transform: uppercase;
  color: #555;
  background-color: ${colors.prim_light};
  border: 2px solid Aquamarine;
  cursor: pointer;
  @media (max-width: 768px) {
  font-size: 20px;         
  }
}

 &:disabled {
  background: ${colors.disabled};
  cursor: not-allowed;
}

`
// BUTTON
export const StyledShadow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  background-color: ${colors.backdrop};
  margin-top: 5px;
  @media (max-width: 768px) {
    padding: 5px 0;
  }
`

// DATE PICKET
export const StyledDatePicker = styled.div`
  & .DateInput_1 {
    width: 100% !important;
    background-color: transparent;
    padding: 0;
    margin-top: 3px;
  }

  & .DateInput_input_1 {
    padding: 6px;
  }

  .DateInput_fangStroke {
    opacity: 0;
  }

  & .SingleDatePicker_picker {
    top: 3px !important;
  }

  & .SingleDatePickerInput {
    background-color: transparent;
    display: block;
    border: none;
  }

  & .SingleDatePicker_picker,
  & .DayPicker,
  & .CalendarMonthGrid,
  & .CalendarMonth {
    background-color: ${colors.ter_yellow} !important;
    background: ${colors.ter_yellow} !important;
  }

  & .CalendarDay__default {
    border: 1px solid #e4e7e7;
    color: ${colors.prim_font};
    font-weight: bold;
    background: ${colors.prim_light};
    border-radius: 50%;
    border: none;

    &:hover {
      transform: scale(1.2) !important;
      border: none;
      outline: none;
    }
  }

  & .CalendarMonth_caption {
    color: #555;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 100;
    margin: 5px 0;
  }

  & .CalendarDay__selected {
    color: ${colors.sec_color};
    background: ${colors.prim_color};
    transform: scale(1.2);
  }

  & .DayPickerNavigation_svg__horizontal {
    fill: red !important;
  }
`

