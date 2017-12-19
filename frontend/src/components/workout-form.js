import m from 'mithril'

// TODO make extensible to creating a new workout outside of users
// TODO make extensible to editing an existing workout
// TODO break into smaller components
const workoutForm = (user, exercises, {get, set}) => {  
  return (
    <div>
      {
        [
          ['Date', 'onDate', 'date'],
          ['Description', 'description', 'text'],
        ].map(([label, field, type]) =>
          <div className="form-field">
            <label>
              {label}
              <input
                type={type}
                oninput={e => set(field, e.target.value)}
                value={get(field) || ''}
              />
            </label>
          </div>
        )
      }
      <h2>Exercises</h2>
      <span className="btn" onclick={() => {
        const idx = get('workoutExercises.length', 0)

        set(`workoutExercises[${idx}]`, {
          workoutId: 0 // will be set by backend
        })
      }}>+</span>
      <ul>
        {get('workoutExercises', []).map((wke, i) =>
          <div className="indent-left-20">
            <div className="form-field">
              <label>Select Exercise
                <select value={wke.exerciseId} oninput={e => set(`workoutExercises[${i}].exerciseId`, +e.target.value)}>
                  <option>-</option>
                  {exercises.map(exercise =>
                    <option value={exercise.id}>{exercise.name}</option>
                  )}
                </select>
              </label>
            </div>
            <span className="btn" onclick={() => {
              const idx = get(`workoutExercises[${i}].sets.length`, 0)
              
              set(`workoutExercises[${i}].sets[${idx}]`, {
                workoutExerciseId: 0 // will be set by backend
              })
            }}>Add Set</span>
            {get(`workoutExercises[${i}].sets`, []).map((wkeSet, j) =>
              <div className="indent-left-20">
                {`Set ${j + 1}`}
                <div className="form-field">
                  <label>Weight
                    <input value={wkeSet.weight} oninput={e => set(`workoutExercises[${i}].sets[${j}].weight`, +e.target.value)} />
                  </label>
                </div>
                <div className="form-field">
                  <label>Reps
                    <input value={wkeSet.reps} oninput={e => set(`workoutExercises[${i}].sets[${j}].reps`, +e.target.value)} />
                  </label>
                </div>
              </div>
            )}
          </div>
        )}
      </ul>
    </div>
  )
}

export default workoutForm