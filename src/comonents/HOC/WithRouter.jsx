import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let params = useParams();
        let location = useLocation();
        let navigate = useNavigate();
        return (
            <Component {...props} router={{ params, location, navigate }} />
        )
    }
    return ComponentWithRouterProp;
}

export default withRouter;