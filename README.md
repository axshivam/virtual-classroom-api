## Virtual ClassRoom API

 **Virtual classroom that has two users:**

 - Teacher
 - Student

 **And has the following functionalities :**
 
 - Assignments are the work assigned to students by the teacher.
 - Assignment can only be created, updated and deleted by the teacher
 - The assignment consists of description, list of students, assignedDate
   and a deadline date
 - Assigned Date at is a date-time field at which the assignment
   needs to be published, if the assignment is scheduled for future then
   its status is SCHEDULED else ONGOING.
 - A student can add only one submission for an assignment.
 - A submission consists of a Comments which will be a text field.
 - If a student has added any submission for an assignment, then the
   status of the assignment for that student gets updated to
   SUBMITTED

 ## API Endpoints

 GET /
 
 - opens the root route of the project

 #### URL params

 None

 #### Headers

 None

 #### Data params

 None

 #### Content

```
{
    "Message": "Welcome to the Home page of the application!"
}
```

---

### _Auth Endpoints_

- Authentication library - jwt
- password encryption library - bcrypt
- Role based auth used -> Route accessibility table
 ```
 teacher                |    student
 -----------------------|--------------------
 Add assignment         | Assignment feed
 Update assignment      | Submit assignment 
 Delete assignment      | Get Assignment details
 Assignment feed        | 
 Get Assignment details |
 ```

---

POST /api/auth/register/
 
 - signs up the user into the system.
 - open route. can be accessed by anyone

 #### URL params
 
 None
 
 #### Headers
 
 None
 
 #### Data params
 
 ```
{
  "firstname": "Shiv",
  "lastname":  "Sharma",
  "email":  "shivsharma123@gmail.com",
  "username":  "axshivam",
  "password":  "shiv@123",
  "accountType": "teacher"
}
```
 
 #### Content

 - Success Response (Retuned a token)
 ```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDUwZDhkOTA3ZTI2OGIyOTliYjExMyIsInVzZXJuYW1lIjoidG9kZGxlIiwidHlwZSI6InRlYWNoZXIiLCJpYXQiOjE2NjU0Njk4MzcsImV4cCI6MTY2NTQ3NzAzN30.zxGfPvSoLw16w_QQl5cdVYgOWjJy_l_9wmZpMa4dI20"
}
 ```

 ---

 POST /api/auth/login/
 
 - logs in the user
 - Open route. Can be accessed by anyone

 #### URL params
 
 None
 
 #### Headers
 
 None
 
 #### Data params
 
 ```
{
  "username":  "axshivam",
  "password":  "shiv@123"
}
 ```
 
 #### Content

 - Success Response (Return a token)

 ```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDUwZDhkOTA3ZTI2OGIyOTliYjExMyIsInVzZXJuYW1lIjoidG9kZGxlIiwidHlwZSI6InRlYWNoZXIiLCJpYXQiOjE2NjU0NzAwMDIsImV4cCI6MTY2NTQ3NzIwMn0.-cvsUwI3HBIN2VrHJbXWr8qtTqbOpopS25h0YEt0jm0"
}
 ```

 ---

 ### _Restricted API Endpoints_

 POST /api/assignment/create/
 
 - Only Teacher cann add an assignment

 #### URL params
 
 None
 
 #### Headers
 
 `authorization: Bearer <token>`
 
 #### Data params
 
 ```
{
    "studentIDs": ["6342af3fc07e2542511f90ff", "634303b352099b44e876b189"],
    "description": "sample description",
    "assignedDate": "2002-12-09",
    "deadline": "2022-01-09"
}
 ```
 
 #### Content

 - Successful Response

 ```
{
    "data": {
        "teacherID": "63450d8d907e268b299bb113",
        "studentIDs": [
            "6342af3fc07e2542511f90ff",
            "634303b352099b44e876b189"
        ],
        "description": "sample description",
        "assignedDate": "2002-12-09T00:00:00.000Z",
        "deadline": "2022-01-09T00:00:00.000Z",
        "_id": "634510d0c78f96cd60e73f23",
        "__v": 0
    }
}
 ```

 --- 

 PATCH /api/assignment/update/

 - Only teacher is allowed to make this request

 #### URL params
 
 - Assignment ID
 
 #### Headers

 `authorization: Bearer <token>`
 
 #### Data params

 ```
{
    "description": "sample description for update purpose",
    "assignedDate": "2002-12-12",
    "deadline": "2022-01-01"
}
 ```
 
 #### Content
 
 ```
Output ===>>>
{
   message: "Record update successfully!"
}

 ```
--- 

 DELETE  /api/assignment/delete/

 - Only Teacher is allowed to make this request

 #### URL params
 
 - Assignment ID
 
 #### Headers

 `authorization: Bearer <token>`
 
 #### Data params
 
 None
 
 #### Content

 ```
{
    "message": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
 ```
 --- 

 GET /api/user/fetchall/

 - Both teacher and Student can make the request.
 - Hit by a student will return the submission made by the student.
 - Hit by the teacher will return all the assignments created by the teacher.
 - Has two filters namely **publish** and **status**.
 - Publish can be applied on both teacher and student.
 - While status can be applied only on the student.

 #### URL params
 
 None
 
 #### Headers

 `authorization: Bearer <token>`
 
 #### Data params
 
 ```
 {
    publish: "String", // [SCHEDULED, ONGOING]
    status: String, // [ALL, PENDING, OVERDUE, SUBMITTED]
 }
 ```
 
 #### Content

 - Success Response

 ```
{
    studentIDs: [String], // Array of student ids that are assigned the assignment.
    teacherID: String, // teacher id 
    _id: String,
    description: String,
    assignedDate: Date,
    deadline: Date
}
 ``` 

 --- 
 
 POST /api/user/submit/

 - Can only be made by the Student
 - Will only be allowed to make a submission if that assignment has been assigned to the student.

 #### URL params
 
 None
 
 #### Headers

 `authorization: Bearer <token>`
 
 #### Data params
 
 ```
{
    "assignmentID": "6342d02f640af48b27e6e0c0",
    "comments": "This is shiv from kanpur"
}
 ```
 
 #### Content

 - Success Response

 ```
{
    "message": "Assignment Submitted Successfully!"
}
 ```

 --- 
 
 GET /api/user/assignmentDetails/

 - Both the student and the teacher could make this request
 - For Student, the api will return the submission made for the respective assignment
 - For Teacher, the api will return all the submissions made for the respective assignment

 #### URL params
 
 - Assignment ID
 
 #### Headers

 `authorization: Bearer <token>`
 
 #### Data params
 
 None
 
 #### Content

 ```
{
    "data": [
        {
            "_id": "6342f7eafb6863635e5def2c",
            "studentID": "123",
            "assignmentID": "6342d02f640af48b27e6e0c0",
            "comments": "This is shiv from kanpur",
            "__v": 0
        },
        {
            "_id": "6343167fd5e73c334df3bbd1",
            "studentID": "123",
            "assignmentID": "6342d02f640af48b27e6e0c0",
            "comments": "This is shiv from kanpur",
            "__v": 0
        },
        {
            "_id": "634316b134e21520a734834a",
            "studentID": "234",
            "assignmentID": "6342d02f640af48b27e6e0c0",
            "comments": "This is shiv from kanpur",
            "__v": 0
        },
        {
            "_id": "6345154e7e4d16e63712579b",
            "studentID": "634514b3a24ced46875c37cb",
            "assignmentID": "6342d02f640af48b27e6e0c0",
            "comments": "This is shiv from kanpur",
            "__v": 0
        }
    ]
}
 ```

 --- 
 

 ### _Data Models_


 #### USER MODEL

 ---

 ![user schema](https://github.com/axshivam/virtual-classroom-api/blob/master/Images/UserSchema.jpeg)

 #### ASSIGNMENT MODEL

 ---

![assignments achema](https://github.com/axshivam/virtual-classroom-api/blob/master/Images/Assignment.jpeg)

 - studentIDs -> Array of student Ids
 - teacherID -> teacher id

 #### SUBMISSION MODEL

 --- 

![SUB](https://github.com/axshivam/virtual-classroom-api/blob/master/Images/Sumbission.jpeg)

 - studentIDs -> Array of student Ids
 - assignmentID -> assignment id

