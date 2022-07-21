import { render, screen,fireEvent,container } from '@testing-library/react';
import App from './App';

test('form shold not recive wrong province letters in the licence plate input', () => {
  const {getByText} = render(<App />);
  const plate = screen.getByPlaceholderText(/PBX-1234 or PBX-0123/i);
  fireEvent.change(plate,{'target':{'value':'ÑLV-1234'}})
  fireEvent.click(getByText("CHECK"));
  expect(getByText(/Invalid licence number. Should be in format: PXB-1234/)).toBeInTheDocument();
});

test('form shold not recive wrong pattern in the licence plate input', () => {
  const {getByText} = render(<App />);
  const plate = screen.getByPlaceholderText(/PBX-1234 or PBX-0123/i);
  fireEvent.change(plate,{'target':{'value':'PWR 1234'}})
  fireEvent.click(getByText("CHECK"));
  expect(getByText(/Invalid licence number. Should be in format: PXB-1234/)).toBeInTheDocument();
});


test('All Special and Government vehicles (second plate letter is E,X,M or S) have no restriction', () => {
  const {getByText} = render(<App />);
  const plate = screen.getByPlaceholderText(/PBX-1234 or PBX-0123/i);
  const datetc = screen.getByPlaceholderText(/Date to check/i);
  const timetc = screen.getByPlaceholderText(/Time to check/i);
  fireEvent.change(plate,{'target':{'value':'PXR-0298'}})
  fireEvent.change(datetc,{'target':{'value':'2022-07-21'}})
  fireEvent.change(timetc,{'target':{'value':'11:00'}})
  fireEvent.click(getByText("CHECK"));
  const hideinput = screen.getByTestId('hideinput');
  expect(hideinput).toHaveValue("This a special licence plate, you're always free to go");
});

test('Free to road on Weekend', () => {
  const {getByText} = render(<App />);
  const plate = screen.getByPlaceholderText(/PBX-1234 or PBX-0123/i);
  const datetc = screen.getByPlaceholderText(/Date to check/i);
  const timetc = screen.getByPlaceholderText(/Time to check/i);
  fireEvent.change(plate,{'target':{'value':'PWR-0298'}})
  fireEvent.change(datetc,{'target':{'value':'2022-07-30'}})
  fireEvent.change(timetc,{'target':{'value':'09:00'}})
  fireEvent.click(getByText("CHECK"));
  const hideinput = screen.getByTestId('hideinput');
  expect(hideinput).toHaveValue("Your car it's free to be on the road");
});

test('Example case 1: Licence: PWR-0292 is not able to go to road on Monday 25-07-2022 at 08:00 ', () => {
  const {getByText} = render(<App />);
  const plate = screen.getByPlaceholderText(/PBX-1234 or PBX-0123/i);
  const datetc = screen.getByPlaceholderText(/Date to check/i);
  const timetc = screen.getByPlaceholderText(/Time to check/i);
  fireEvent.change(plate,{'target':{'value':'PWR-0292'}})
  fireEvent.change(datetc,{'target':{'value':'2022-07-25'}})
  fireEvent.change(timetc,{'target':{'value':'08:00'}})
  fireEvent.click(getByText("CHECK"));
  const hideinput = screen.getByTestId('hideinput');
  expect(hideinput).toHaveValue("You can't go out with your car");
});

test('Example case 2: Licence: PWR-0292 is able to go to road on Monday 25-07-2022 at 11:00 ', () => {
  const {getByText} = render(<App />);
  const plate = screen.getByPlaceholderText(/PBX-1234 or PBX-0123/i);
  const datetc = screen.getByPlaceholderText(/Date to check/i);
  const timetc = screen.getByPlaceholderText(/Time to check/i);
  fireEvent.change(plate,{'target':{'value':'PWR-0292'}})
  fireEvent.change(datetc,{'target':{'value':'2022-07-25'}})
  fireEvent.change(timetc,{'target':{'value':'11:00'}})
  fireEvent.click(getByText("CHECK"));
  const hideinput = screen.getByTestId('hideinput');
  expect(hideinput).toHaveValue("Your car it's free to be on the road");
});
