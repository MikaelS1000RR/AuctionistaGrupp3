console.log('Loaded main script')

async function greet() {
  let res = await fetch('/greet')
  console.log(await res.text())
}

greet()

async function getUsers() {
  let res = await fetch('/rest/users')
  console.log(await res.json())
}

getUsers()