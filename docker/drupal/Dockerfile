FROM drupal:9.3-php7.4
WORKDIR /opt/drupal
RUN apt-get update && apt-get install -y git mc
COPY --chown=www-data:www-data ./drupal ./
RUN composer install

