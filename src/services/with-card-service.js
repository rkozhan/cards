import CardServiceContext from "./card-service-context";

const WithCardService = () => (Wrapped) => {
    return (props) => {
        return (
            <CardServiceContext.Consumer>
                {
                    (CardService) => {
                        return <Wrapped {...props} CardService={CardService}/>
                    }
                }
            </CardServiceContext.Consumer>
        )
    }
};

export default WithCardService;