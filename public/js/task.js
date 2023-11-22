const setTagAsDone = async (element, id) => {
    event.preventDefault()
    try {
        let headers = new Headers({ 'Content-Type': 'application/json' })
        let body = JSON.stringify({ task: { done: element.checked } })
        let response = await fetch(`/tasks/${id}?_method=put`, { headers: headers, body: body, method: 'PUT' })
        let data = await response.json()
        let taks = data.task
        let parentNode = element.parentNode

        if (taks.done) {
            element.checked = true
            parentNode.classList.add('has-text-success')
            parentNode.classList.add('his-italic')
        } else {
            element.checked = false
            parentNode.classList.remove('has-text-success')
            parentNode.classList.remove('his-italic')
        }
    } catch (error) {
        console.log(error)
    }
}