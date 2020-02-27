class userRepo {
  constructor(users) {
    this.users = users.travelers
  }
  findUser(name) {
    return this.users.find(user => user.name.toLowerCase() === name.toLowerCase())
  }
}

//^^ BUILD TESTS

export default userRepo;