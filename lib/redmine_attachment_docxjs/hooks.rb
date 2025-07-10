module RedmineAttachmentDocxjs
  class Hooks < Redmine::Hook::ViewListener
    def view_layouts_base_html_head(context = {})
      # Check that the current route matches attachments/:id
      if context[:controller]&.action_name == 'show' && 
          context[:controller]&.controller_name == 'attachments'
        javascript_include_tag('redmine_attachment_docxjs', plugin: 'redmine_attachment_docxjs')
      end
    end
  end
end 
  