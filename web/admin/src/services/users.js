// import {request} from "./index";

const usersResponse = {
  content: [
    {_id: 1, firstName: "Orlando", lastName:  "Netto", email: "orlandonetto11@gmail.com", phone: "+55 (81) 9.9814-9788", createdAt: new Date(), updatedAt: new Date()},
    {_id: 2, firstName: "Ayrton", lastName: "Vinicius", email: "ayrtonvinicius14@gmail.com", phone: "+55 (81) 9.9814-9799", createdAt: new Date(), updatedAt: new Date()},
    {_id: 3, firstName: "Oscar", lastName: "Paiva", email: "oscarpedro67@gmail.com", phone: "+55 (81) 9.9814-9777", createdAt: new Date(), updatedAt: new Date()},
  ]
}

export const getUsers = (payload) => Promise.resolve(usersResponse);
export const getUser = (payload) => Promise.resolve(usersResponse.content[payload._id - 1]);
