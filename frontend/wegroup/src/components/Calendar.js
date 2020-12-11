
import React, {PureComponent} from "react";
import moment from 'moment';
import Dayz from "dayz/dist/dayz";
import "./../styles/Calendar.css";
import classNames from "classnames";

class Calendar extends PureComponent {


    /**
     * Takes in classes and renders their sections and subsections
     * @returns {EventsCollection|*|EventsCollection|g}
     */
    createEvents() {
        return new Dayz.EventsCollection(this.props.events);
    }

    render() {
        const relativeDate = moment();
        const events = this.createEvents();
        const names = classNames("calendar", {safari: true});

        return (
            <div className={names}>
                <Dayz
                    date={relativeDate}
                    events={events}
                    display="week"
                    displayHours={[8, 23]}
                />
            </div>
        );
    }
}


Calendar.defaultProps = {
    events: [],
};
export default Calendar;