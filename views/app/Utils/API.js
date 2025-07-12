import Cookies from 'js-cookie';

const getCookie = (name) => {
    return Cookies.get(name) || null;
};


const fetchData = async (url) => {
    try {
        const accessToken = getCookie("token");
        // console.log(accessToken);

        const response = await fetch(BASE_URL + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            // credentials: 'include',
        });

        if (response.status === 403 || response.status === 401) {
            window.location.href = "/auth/login";
            return;
        }

        if (!response.ok) {
            const errorResponse = await response.json();
            // ShowToast(errorResponse?.error || "Unknown error occurred.");
            console.log(errorResponse);
            return;
        }

        return await response.json();
    } catch (error) {
        // ShowToast("Error fetching data: " + error.message);
        console.log(error.message);
    }
};

// Post Data with JWT
const postData = async (url, data) => {
    try {
        const accessToken = getCookie("token");

        const response = await fetch(BASE_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            // credentials: 'include',
            body: JSON.stringify(data),
        });

        if (response.status === 403 || response.status === 401) {
            window.location.href = "/auth/login";
            return;
        }

        if (response.ok) {
            return await response.json();
        } else {
            const errorResponse = await response.json();
            ShowToast(errorResponse?.error || "Unknown error occurred.");
        }
    } catch (error) {
        ShowToast("Error posting data: " + error.message);
        console.log(error.message);
    }
};

// Post FormData with JWT
const postFormData = async (url, data) => {
    try {
        const accessToken = getCookie("token");

        const response = await fetch(BASE_URL + url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            // credentials: 'include',
            body: data,
        });

        if (response.status === 403 || response.status === 401) {
            window.location.href = "/auth/login";
            return;
        }

        if (response.ok) {
            return await response.json();
        } else {
            const errorResponse = await response.json();
            ShowToast(errorResponse?.error || "Unknown error occurred.");
        }
    } catch (error) {
        ShowToast("Error posting form data: " + error.message);
        console.log(error.message);
    }
};

// Put Data with JWT
const putData = async (url, data) => {
    try {
        const accessToken = getCookie("token");

        const response = await fetch(BASE_URL + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            // credentials: 'include',
            body: JSON.stringify(data),
        });

        if (response.status === 403 || response.status === 401) {
            window.location.href = "/auth/login";
            return;
        }

        if (response.ok) {
            return await response.json();
        } else {
            const errorResponse = await response.json();
            ShowToast(errorResponse?.error || "Unknown error occurred.");
        }
    } catch (error) {
        ShowToast("Error updating data: " + error.message);
        console.log(error.message);
    }
};

// Delete Data with JWT
const deleteData = async (url, data) => {
    try {
        const accessToken = getCookie("token");

        const response = await fetch(BASE_URL + url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            // credentials: 'include',
            body: JSON.stringify(data),
        });

        if (response.status === 403 || response.status === 401) {
            window.location.href = "/auth/login";
            return;
        }

        if (response.ok) {
            return await response.json();
        } else {
            const errorResponse = await response.json();
            ShowToast(errorResponse?.error || "Unknown error occurred.");
        }
    } catch (error) {
        ShowToast("Error deleting data: " + error.message);
        console.log(error.message);
    }
};
