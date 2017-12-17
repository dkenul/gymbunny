import m from 'mithril'
import { stateless } from 'helpers/view'

export default stateless(({
  isOpen = false,
  header,
  submitBtnText = 'Submit',
  cancelBtnText = 'Cancel',
  onSubmit,
  onCancel,
}, children) =>
  <div className={`modal ${isOpen ? 'is-open' : ''}`}>
    <div className="modal-header">
      {header}
    </div>
    <div className="modal-content">
      {children}
    </div>
    <div className="modal-footer clearfix">
      <div className="right">
        <span className="btn" onclick={onCancel}>{cancelBtnText}</span>
        <span className="btn" onclick={onSubmit}>{submitBtnText}</span>
      </div>
    </div>
  </div>
)