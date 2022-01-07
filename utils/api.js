import {getSession} from "next-auth/react";

async function apiRefreshToken(token) {

    const session = await getSession()
    const newToken = session?.user?.access_token;
    //if (newToken===token) alert('same'+'---'+token); else alert('diff'+'---'+token+'---'+newToken)
    if (newToken !== token) {
        return newToken;
    } else {
        return null;
    }

}

async function apiCall(url, method = "GET", token = null, data = null, autoRepeat = true) {
    //We don't catch exceptions - caller should use catch
    const res = await fetch(`http://localhost:9000/api${url}`, {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(token && {'Authorization': 'Bearer ' + token}),
        },
        ...(data !== null && {body: JSON.stringify(data)}),
    })
    if (res.ok) {
        return res.json();
    } else {
        if (res.status === 401) {
            const msg = await res.json();
            if (msg?.message === "expired") {
                const newToken = await apiRefreshToken(token)
                if (newToken && autoRepeat) {
                    return apiCall(url, method, newToken, data, false);
                }
            }
        }
        throw new Error(res.statusText)
        //return res.statusText
    }
}

export async function apiDeleteUser(token, id) {
    return await apiCall(`/auth/user/${id}`, "DELETE", token)
}

export async function apiUserLogin(email, password) {
    return await apiCall(`/user/login`, "POST", {email, password})
}

export async function apiUserLogout(token) {
    return await apiCall(`/user/logout`, "POST", token)
}

export async function apiGetUserList(page = 0, limit = 10, token) {
    return await apiCall(`/admin/user/list?limit=${limit}&page=${page}`, 'GET', token)
}

export async function apiGetSubUserList(page = 0, limit = 10, token) {
    return await apiCall(`/auth/user/children/list?limit=${limit}&page=${page}`, 'GET', token)
}

export async function apiSearchUser(token, limit = 10, filter = "", role = "", parent_id = 0) {
    return await apiCall(`/auth/user/search?limit=${limit}&filter=${filter}&role=${role}&parent_id=${parent_id}`, 'GET', token)
}

export async function apiGetUser(token, id) {
    return await apiCall(`/auth/user/${id}`, 'GET', token)
}


export async function apiUpdateUser(token, id, user) {
    const {upload, ...updatedUser} = user;
    if (upload) {
        const ext = upload.name.split('.').pop();
        const filename = id + '.' + ext;
        const body = new FormData();
        body.append("file", upload, filename);
        body.append('user', id)
        body.append('type', 'avatar')
        const response = await fetch("/api/file", {
            method: "POST",
            body
        });
        if (!response.ok) throw new Error("File upload error")
        updatedUser.picture = filename;
    }
    if (updatedUser.password.length < 1) {
        delete updatedUser.password;
    }

    console.log(updatedUser)
    return await apiCall(`/auth/user/${id}`, 'PATCH', token, updatedUser)
}

////////////////////////////////////////////////////////////////////////////////////////////////

export async function apiGetAvailablePrizes(token, prizeId) {
    return await apiCall(`/auth/user/${prizeId}/prizes/available`, 'GET', token)
}

export async function apiDeletePrize(token, prizeId) {
    return await apiCall(`/auth/prize/${prizeId}`, 'DELETE', token)
}

export async function apiGetPrize(token, prizeId) {
    return await apiCall(`/auth/prize/${prizeId}`, 'GET', token)
}

export async function apiUpdatePrize(token, prizeId, prize) {
    return await apiCall(`/auth/prize/${prizeId}`, 'PATCH', token, prize)
}

export async function apiCreatePrize(token, userId, prize) {
    return await apiCall(`/auth/user/${userId}/prize/create`, 'POST', token, prize)
}

////////////////////////////////////////////////////////////////////////////////////////////////

export async function apiGetAvailableTasks(token, taskId) {
    return await apiCall(`/auth/user/${taskId}/tasks/available`, 'GET', token)
}

export async function apiDeleteTask(token, taskId) {
    return await apiCall(`/auth/task/${taskId}`, 'DELETE', token)
}

export async function apiGetTask(token, taskId) {
    return await apiCall(`/auth/task/${taskId}`, 'GET', token)
}

export async function apiUpdateTask(token, taskId, task) {
    return await apiCall(`/auth/task/${taskId}`, 'PATCH', token, task)
}

export async function apiCreateTask(token, userId, task) {
    return await apiCall(`/auth/user/${userId}/task/create`, 'POST', token, task)
}
