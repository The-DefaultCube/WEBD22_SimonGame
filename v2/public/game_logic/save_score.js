export function handleScore(score) {
    let name = prompt(
        "You Scored " + score + " points ! Save your Name !!!",
        ""
    );
    if(name != "" && name != null){
        console.log(name + " " + score);
        const endpoint = '/save_score';

        // Prepare data in the format of name and score
        const data = {
            name: name,
            score: score
        };

        // Make a POST request using the Fetch API
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('error');
            }
            return response.json();
        })
        .then(result => {
            console.log('Data sent successfully:', result);
        })
        .catch(error => {
            console.error('Problem with the fetch operation:', error.message);
        });
            
    }
}