class PointsApiClient {

    static SERVER_URL = 'http://localhost:8080';
    static GET_POINTS = '/points?purchaseTotal=';       
     

    static getPoints(purchaseAmt: any): Promise<Response> {
        return fetch(PointsApiClient.SERVER_URL +
            PointsApiClient.GET_POINTS + purchaseAmt);
    }

  
}

export default PointsApiClient;