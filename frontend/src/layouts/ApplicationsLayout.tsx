import { Outlet } from 'react-router-dom';

import ApplicationTrackerView from '../views/ApplicationTracker';

/**
 * The `ApplicationsLayout` function renders the ApplicationTrackerView component
 * and provides an outlet for displaying the Single Application Drawer.
 * 
 * @return The `ApplicationsLayout` component is being returned. It includes a
 * `div` element with the id "applications-layout" and the class "h-full". Inside
 * the `div`, the `ApplicationTrackerView` component is rendered, and an `Outlet`
 * component is used for displaying the Single Application Drawer.
 */
function ApplicationsLayout() {
    return (
        <div id="applications-layout" className="h-full">
            <ApplicationTrackerView />

            {/* Used for displaying the Single Application Drawer */}
            <Outlet />
        </div>
    );
}

export default ApplicationsLayout;