update glpi_users set picture = '12/2_6682e2b004b12.jpg'  where name not like '%@%';
update glpi_users set picture = 'c3/8_6682e276a2cc3.png'  where name like '%@qosit';
update glpi_users set entities_id = '0' where name like '%@qosit';
update glpi_users set picture = 'dc/10_6682d25547bdc.jpg' where name like '%@cdmtecnologia';
update glpi_users set entities_id = '1' where name like '%@cdmtecnologia';
update glpi_users set picture = '09/15_6682d0f65f709.png' where name like '%@folkportariaremota';
update glpi_users set entities_id = '23' where name like '%@folkportariaremota';
update glpi_users set picture = 'e7/17_6682e0f7983e7.png' where name like '%@confiaros';
update glpi_users set entities_id = '28' where name like '%@confiaros';
update glpi_users set picture = '5e/18_6682d0b26855e.png' where name like '%@noeldecor';
update glpi_users set entities_id = '33' where name like '%@noeldecor';
update glpi_users set picture = '55/22_6682f2c780c55.png' where name like '%@lipopel';
update glpi_users set entities_id = '30' where name like '%@lipopel';
update glpi_users set picture = '55/22_6682f2c780c55.png' where name like '%@plushcuritiba';
update glpi_users set entities_id = '30' where name like '%@plushcuritiba';
update glpi_users set picture = '69/24_6683f750e5d69.png' where name like '%@adaptcobrancas';
update glpi_users set entities_id = '106' where name like '%@adaptcobrancas';
update glpi_users set picture = '0e/25_6683f3f646b0e.png' where name like '%@condoplus';
update glpi_users set entities_id = '107' where name like '%@condoplus';
update glpi_users set picture = '93/26_6683f55480193.png' where name like '%@esalflores';
update glpi_users set entities_id = '32' where name like '%@esalflores';
update glpi_users set picture = 'e0/27_6683f8f5af5e0.png' where name like '%@banapneus';
update glpi_users set entities_id = '29' where name like '%@banapneus';
update glpi_users set picture = 'a3/29_6684545e065a3.png' where name like '%@protatic';
update glpi_users set entities_id = '26' where name like '%@protatic';
update glpi_users set picture = '0a/31_66855c5c77d0a.png' where name like '%@campere';
update glpi_users set entities_id = '31' where name like '%@campere';
update glpi_users set picture = '0a/31_66855c5c77d0a.png' where name like '%@condogold';
update glpi_users set entities_id = '108' where name like '%@condogold';

update glpi_users set palette = 'auror_dark' ;
 update glpi_users set profiles_id = '1' where name not like '%@%' AND name not like '%@qosit%' ;
