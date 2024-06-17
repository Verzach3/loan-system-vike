export type reportType = {
    name: string,
    email: string,
    requestStartDate: string,
    requestEndDate: string,
    status: string,
    requestType: string,
}


export type query ={
    resource_request: {
        id:"",
        userId:"",
        requestStartDate:"",
        requestEndDate:"",
        classroomId:"",
        status: ""
      },
      
    classroom_request: {
        id:"",
        userId:"",
        requestStartDate:"",
        requestEndDate:"",
        classroomId:"",
        status: ""
      },
}