function mutateDOB(dateString) {
    
    console.log(dateString)
    console.log(typeof(dateString))
    const [year, month, day] = dateString.split('/');
    
    const mutatedDate = day + month + year;
    
    return mutatedDate;
}

function cropAadhar(aadhar_number) {
    // Convert Aadhar number to a string
    const aadharString = aadhar_number.toString();

    // Crop the first five characters
    const croppedAadhar = aadharString.substring(0,5);

    return croppedAadhar;
}


exports.generateUserid = (aadhar_number, dob) => {
    //mutateDOB("2002-10-30")
    //dobString = 30012002
    const dateToString = dob.toLocaleDateString()
    const dobString = mutateDOB(dateToString)

    //keep in mind Adhar is of type int, unfortunately
    const firstFiveDigitsOfAdhar = cropAadhar(aadhar_number)

    return `ED${firstFiveDigitsOfAdhar}${dobString}`
}

