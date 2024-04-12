# Admin Service Endpoints

This document provides information on how to use the Admin Service endpoints.

## Admin Signup

### Endpoint
POST http://localhost:<port>/admin/signup

### Request Body
```json
    {
        "name": "Uday",
        "email": "uday@gmail.com",
        "password": "stephcurry"
    }
```
Response
Status: 200
    account created!

## Admin Login
### Endpoint

POST http://localhost:<port>/admin/login

### Request Body
```json
{
    "email": "uday@gmail.com",
    "password": "stephcurry"
}
```
Response
Status: 200

```json
{
    "session_id": "5469789a-a233-40fd-963f-6b9aecfc1179",
    "msg": "This is your session id, send it as the header with the same key in every request"
}
```

## Admin Logout
### Endpoint
POST http://localhost:<port>/admin/logout

Request Headers
Authorization: "5469789a-a233-40fd-963f-6b9aecfc1179"

Request Body
```json
{
    "email": "uday@gmail.com"
}
```
Response
Status: 200
"Logged out successfully!"


## Approve Applications
### Endpoint
POST http://localhost:<port>/approve/applications

Request Headers
Authorization: "5469789a-a233-40fd-963f-6b9aecfc1179"

###Request Body
```json
{
    "email": "uday@gmail.com"
}
```
Response
Status: 200
```
```json
[
    {
        "user": {
            User information
        },
        "application": {
            Application information
        }
    },
    {
        "user": null,
        "application": {
            Application information
        }
    }
]
```
## Update Application Status
### Endpoint
PUT http://localhost:<port>/approve/updatestatus

### Request Headers
Authorization: "5469789a-a233-40fd-963f-6b9aecfc1179"

### Request Body
```json
{
    "email": "uday@gmail.com",
    "appid": "65fc1fb6f27e03bb9a98ad47",
    "status": "done"
}
```
Response
Status: 200

```json
{
    "message": "Status Updated Successfully"
}
```

# Application Form Endpoints
# Scholarship Portal Backend API

Welcome to the Scholarship Portal Backend API! Below are the endpoints available for use:
# All the below parameter are to be sent in the request body as
# req.body.<parameter_name>
# example : req.body.father_name

## Personal Details
- Endpoint: `http:localhost:3000/application/uploadPersonalDetails`
- Description: Upload personal details of the applicant.
- Method: POST
- Parameters:
  - full_name: Full name of the applicant
  - email_address: Email address of the applicant
  - mobile_number: Mobile number of the applicant
  - date_of_birth: Date of birth of the applicant
  - gender: Gender of the applicant
  - aadhar_number: Aadhar number of the applicant
  - country: Country of residence
  - state: State of residence
  - current_address: Current residential address
  - permanent_address: Permanent residential address

# Once the personal details page is sent, in the response
# you get the user_id in the response
# Locally store it in the front end and send it in the req.body.user_id in the following pages
## Academic Details
- Endpoint: `http:localhost:3000/application/uploadAcademicDetails`
- Description: Upload academic details of the applicant.
- Method: POST
- Parameters:
  - user_id: User ID of the applicant
  - school_name: Name of the school
  - currently_studying: Standard/Grade currently studying
  - pu_college_name: Name of the PU college
  - sslc_marks: SSLC marks
  - college_name: Name of the college
  - puc_marks: PUC marks
  - entrance_score: Entrance exam score

# Keep in mind that all fields are not mandatory, if you want to send father and mother details only, it is totally fine, but when you choose to only send father and mother info , make sure you send all details related to them.... else it is will stored as an empty string in the db 
## Family Details
- Endpoint: `http:localhost:3000/application/uploadFamilyDetails`
- Description: Upload family details of the applicant.
- Method: POST
- Parameters:
  - user_id: User ID of the applicant
  - father_name: Name of the father
  - father_age: Age of the father
  - father_qualification: Qualification of the father
  - father_annual_income: Annual income of the father
  - father_designation: Designation of the father
  - father_name_of_organization: Name of the organization where father works
  - mother_name: Name of the mother
  - mother_age: Age of the mother
  - mother_qualification: Qualification of the mother
  - mother_annual_income: Annual income of the mother
  - mother_designation: Designation of the mother
  - mother_name_of_organization: Name of the organization where mother works
  - brother_name: Name of the brother
  - brother_age: Age of the brother
  - brother_qualification: Qualification of the brother
  - brother_annual_income: Annual income of the brother
  - brother_designation: Designation of the brother
  - brother_name_of_organization: Name of the organization where brother works
  - sister_name: Name of the sister
  - sister_age: Age of the sister
  - sister_qualification: Qualification of the sister
  - sister_annual_income: Annual income of the sister
  - sister_designation: Designation of the sister
  - sister_name_of_organization: Name of the organization where sister works
  - guardian_name: Name of the guardian
  - guardian_age: Age of the guardian
  - guardian_qualification: Qualification of the guardian
  - guardian_annual_income: Annual income of the guardian
  - guardian_designation: Designation of the guardian
  - guardian_name_of_organization: Name of the organization where guardian works

## Bank Details
- Endpoint: `http:localhost:3000/application/uploadBankDetails`
- Description: Upload bank details of the applicant.
- Method: POST
- Parameters:
  - user_id: User ID of the applicant
  - account_holder: Name of the account holder
  - account_number: Account number
  - ifsc: IFSC code
  - bank_name: Name of the bank
  - branch_name: Branch name




# Status Checking

Welcome to the Scholarship Portal Backend API! Below are the endpoints available for retrieving application status:

## Get Application Status
- Endpoint: `/status/:appnid`
- Description: Retrieve the status of a scholarship application.
- Method: GET
- Parameters:
  - appnid: Application ID of the scholarship application

### Response
- Status: 200 OK
- Body:
  - status: Status of the application (e.g., 'Accept', 'Reject', 'Pending')
  - reasonForRejection (if status is 'Reject'): Reason for rejection of the application

#### Example
```json
{
  "status": "Reject",
  "reasonForRejection": "Incomplete documents"
}
