import { dayRestrict, nigthRestrict } from "../data/constants";
import { restrictions } from "../data/retrictions"

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
    restricted.map(item => {
        if (plate === item.number &&
            ((hour >= dayRestrict[0] && hour <= dayRestrict[1]) ||
                (hour >= nigthRestrict[0] && hour <= nigthRestrict[1]))
        )
            restrict = true
    })
    return restrict
}

export { checkRestriction }