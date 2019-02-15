function redirectTo(newPath, state = null){
    this.props.history.push({
        pathname: newPath,
        state: state});
}

function ValidateEmail(inputText) {
    var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    if(inputText.match(mailformat)){
        return true;
    } else {
        return false;
    }
}

export {redirectTo, ValidateEmail};