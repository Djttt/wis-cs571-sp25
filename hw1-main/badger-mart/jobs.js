function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!
    // TODO: Alert the user of the job that they applied for!
    const jobs = document.getElementsByName("job");
    let selectedJob;
    for (let job of jobs) {
        if (job.checked) {
            selectedJob = job;
            break;
        }
    }
    if (selectedJob) {
        alert(`Thank you for applying to be a ${selectedJob.value}!`);
    } else {
        alert("Please select a job!");
    }
}