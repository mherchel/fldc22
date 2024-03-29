<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * Skipping permissions hardening will make scaffolding
 * work better, but will also raise a warning when you
 * install Drupal.
 *
 * https://www.drupal.org/project/drupal/issues/3091285
 */
// $settings['skip_permissions_hardening'] = TRUE;

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}

// Automatically generated include for settings managed by ddev.
$ddev_settings = dirname(__FILE__) . '/settings.ddev.php';
if (getenv('IS_DDEV_PROJECT') == 'true' && is_readable($ddev_settings)) {
  require $ddev_settings;
}

// Don't enable devel or stage_file_proxy on the live environment.
if (
  isset($_ENV['PANTHEON_ENVIRONMENT']) && (($_ENV['PANTHEON_ENVIRONMENT'] == 'live'))
) {
  $settings['config_exclude_modules'] = ['devel', 'stage_file_proxy'];
}

// Sendgrid settings.
if ( isset($_ENV['PANTHEON_ENVIRONMENT']) && (($_ENV['PANTHEON_ENVIRONMENT'] == 'live') || ($_ENV['PANTHEON_ENVIRONMENT'] == 'test'))) {
  $secrets_json_text = file_get_contents('/files/private/secrets.json');
  $secrets_data = json_decode($secrets_json_text, TRUE);
  $config['sendgrid_integration.settings']['apikey']  = $secrets_data['sendgrid_api_key'];
}
