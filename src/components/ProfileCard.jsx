const ProfileCard = ({ user }) => {
    const { firstName, lastName, age, gender, about, skills } = user;
    return (
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={user.photoURL} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{`${age}, ${gender}`}</p>
          <p>{skills.join(" , ")}</p>
          <p>{about}</p>
        </div>
       </div>
  )
}

export default ProfileCard