import { licencePattern, provinceCodes } from "../data/constants"


const validateForm = (form) => {

    const {
        plate_number,
        date_info,
        time_info

    } = form
    const newErrors = {}
    if (!date_info || date_info === 'Selecciona una empresa') {
        newErrors.date_info = 'Please select a date'
    }
    if (!time_info || time_info === '') {
        newErrors.time_info = 'Please select a time'
    }
    if (!plate_number || plate_number === '') {
        newErrors.plate_number = 'Type a licence number'
    } else if (plate_number.length > 8 || !plate_number.toUpperCase().match(licencePattern) ||
        !provinceCodes.includes(plate_number[0].toUpperCase())) {
        newErrors.plate_number = 'Invalid licence number. Should be in format: PXB-1234'
    }

    return newErrors
}

export { validateForm }