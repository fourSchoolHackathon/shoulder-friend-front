import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  width: 100vw;
`

export const Content = styled.form`
  max-width: 30rem;
  width: 85%;
  border-radius: 0.7rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 1rem 0;
`

export const Select = styled.select`
  max-width: 20rem;
  width: 90%;
  margin: 0 0.7rem;
  height: 2.5rem;
  font-size: 1rem;
  text-align: center;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.5rem;
  border: 1px solid #e4e4e4;
  background: url('/arrow-down.svg') no-repeat 95% 50%;
  outline-color: #ff8450;
`

export const Option = styled.option`
  background: #ff8450;
  color: #fff;
  font-size: 1rem;
`

export const CheckBoxWrapper = styled.div`
  box-sizing: border-box;
  padding: 0 1rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`

export const CheckBoxBorder = styled.label`
  border: 1px solid #e4e4e4;
  padding: 1rem;
  border-radius: 0.2rem;
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
`

export const CheckBox = styled.input`
  cursor: pointer;
`

export const InputWrapper = styled.div`
  max-width: 21rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
  box-sizing: border-box;
`

export const FakeInput = styled.div`
  max-width: 20rem;
  width: 90%;
  box-sizing: border-box;
  border-radius: 0.7rem;
  border: 1px solid #e4e4e4;
  padding: 0.7rem 0.7rem;
  font-size: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #000;
    text-decoration: none;
    margin-top: 0.5rem;

    :hover {
      text-decoration: underline;
    }
  }
`

export const Button = styled.button`
  font-size: 1rem;
  border: none;
  background: #ff8450;
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
`
