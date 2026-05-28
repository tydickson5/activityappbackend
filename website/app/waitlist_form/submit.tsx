export function Submit({email}){

    async function join(){

        var response = await fetch("http://192.168.10.119:3000/users/waitlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        })
        console.log(response)
        console.log(email)
    }

    return (
        <div>
            <button onClick={join}>Join</button>
        </div>
    )

}