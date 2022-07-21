import { dayRestrict, exceptionPlates, nigthRestrict } from "../data/constants";
import { restrictions } from "../data/retrictions"
import Swal from 'sweetalert2'


const isSpecialPlate = (second) => {
    if (exceptionPlates.includes(second))
        return true;
    else
        return false
}


const getRestrictedPlates = (day) => {
    let restricted = null;
    restrictions.map(item => {
        if (item.day === day)
            restricted = item.restricted_plates;
    })
    return restricted
}

const checkRestriction = (day, plate, hour) => {
    let restrict = false;
    let restricted = getRestrictedPlates(day);
    if (restricted != null) {
        restricted.map(item => {
            if (plate === item.number &&
                ((hour >= dayRestrict[0] && hour <= dayRestrict[1]) ||
                    (hour >= nigthRestrict[0] && hour <= nigthRestrict[1]))
            )
                restrict = true
        })
    }
    return restrict
}


const showSucess = (msg) => {
    Swal.fire(
        'Great!',
        msg,
        'success'
    )
}

const showWrong = (msg) => {
    Swal.fire(
        'Ups!',
        msg,
        'error'
    )
}


export { checkRestriction, isSpecialPlate, showSucess, showWrong }