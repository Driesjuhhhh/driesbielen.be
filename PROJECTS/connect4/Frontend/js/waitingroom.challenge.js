function InvitePlayer(username, userId) {
    // Get the user and message from the input fields
    const user = JSON.parse(localStorage.getItem("user")).user;

    alert(
        `You (${user.nickName}) invited ${username} (${userId}) to play a game!`
    );
}

export { InvitePlayer };