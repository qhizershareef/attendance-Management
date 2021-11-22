
const authToken = localStorage.getItem('qtoken');
const data = JSON.parse(authToken);
function checkToken(){
        if(authToken && data){
            return true;
        }
        else{
            return false;
        }
    }