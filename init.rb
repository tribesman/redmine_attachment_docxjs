require 'redmine'

Redmine::Plugin.register :redmine_attachment_docxjs do
  name 'Redmine attachment docxjs'
  author 'tribesman'
  description 'Redmine attachment docxjs viewer'
  version '0.0.1'
  url ''
  author_url 'https://github.com/tribesman'
end

# Подключаем JavaScript файлы
Rails.application.config.to_prepare do
  require_dependency 'redmine_attachment_docxjs/hooks'
end 
