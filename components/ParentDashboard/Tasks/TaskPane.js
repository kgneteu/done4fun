import * as PropTypes from "prop-types";
import {Loader} from "../../UI/Loader";

import * as React from "react";
import {AvailableTasks} from "./AvailableTasks";

function TaskPane({user: kid}) {
    if (!kid) return <Loader/>
    return (
            <AvailableTasks user={kid}/>
    )
}

TaskPane.propTypes = {user: PropTypes.any};

export default TaskPane
