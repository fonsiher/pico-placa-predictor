import React, {useState} from 'react'
import {Form,Button} from 'react-bootstrap';
import { actualtime, today } from '../data/constants';
import { checkRestriction} from '../services/checkService';
import { getWeekday } from '../services/dateService';
import { validateForm } from '../services/validatationService';

export const FormPP = () => {

    const [formp, setFormp] = useState({});
    const [errors, setErrors] = useState({});
    const setField = (field,value)=>{
        setFormp({
            ...formp,
            [field]:value
        })
        if(!!errors[field])
        setErrors({
            ...errors,
            [field]:null
        })
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formErrors = validateForm(formp);
        if(Object.keys(formErrors).length > 0){
          setErrors(formErrors);
        }else{
          formp.date_info = getWeekday(formp.date_info);
          let plateNumber = Number(formp.plate_number.charAt(formp.plate_number.length-1))
          let haveRestriction = checkRestriction(formp.date_info,plateNumber,formp.time_info)
          //let haveRestriction = checkRestriction("Wednesday",5,formp.time_info)
          console.log("Está vetado:",haveRestriction);
          
        }
        
    }
  return (

    <div id="content-wrapper" className="d-flex flex-column">
    <div id='content'>
    <h3>Check if your car can be on the road </h3>
    <br />
    <div className="row justify-content-center">
    <Form>
    <Form.Group
          className="mb-3"
          controlId="plate_number"
        >
          <Form.Label>Licence Plate Number:</Form.Label>
          <Form.Control 
          type='text'
          pattern="[0-9]+" 
          placeholder='PBX-1234 or PBX-0123' 
          onChange={(e)=>setField('plate_number',e.target.value)}
          isInvalid={!!errors.plate_number}
           autoFocus
           required />
           <Form.Control.Feedback type='invalid'>
            {errors.plate_number}
        </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="date_info">
          <Form.Label>Date to check:</Form.Label>
          <Form.Control
            type="date"
            placeholder="Date to check"
            onChange={(e)=>setField('date_info',e.target.value)}
            min={today()}
            isInvalid={!!errors.date_info}
            required
          />
         <Form.Control.Feedback type='invalid'>
            {errors.date_info}
        </Form.Control.Feedback>
        </Form.Group> 
        <Form.Group className="mb-3" controlId="time_info">
        <Form.Label>Time to check:</Form.Label>
          <Form.Control
            type="time"
            min = {actualtime()}
            onChange={(e)=>setField('time_info',e.target.value)}
           isInvalid={!!errors.time_info}
            required
          />
           <Form.Control.Feedback type='invalid'>
            {errors.time_info}
        </Form.Control.Feedback>
        </Form.Group>
        <Button variant="secondary" type='submit' onClick={handleSubmit}>
        CHECK
      </Button>
      </Form>

    </div>

    </div>
  </div>



  )
}

export default FormPP
