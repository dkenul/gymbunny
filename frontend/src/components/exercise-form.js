import m from 'mithril'

const fields = [{
  id: 'name',
  label: 'Name',
  type: 'text',
}]

const exerciseForm = ({get, set}) =>
  <div>
    {fields.map(field =>
      <div className="form-field">
        <label>
          {field.label}
          <input
            type={field.type}
            oninput={e => set(field.id, e.target.value)}
            value={get(field.id) || ''}
          />
        </label>
      </div>
    )}
  </div>

export default exerciseForm