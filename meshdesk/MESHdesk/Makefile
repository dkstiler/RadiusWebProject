include $(TOPDIR)/rules.mk

PKG_NAME:=zzz-MESHdesk
PKG_VERSION:=5.0.0
PKG_RELEASE:=2

include $(INCLUDE_DIR)/package.mk

define Package/zzz-MESHdesk
   SECTION:=net
   CATEGORY:=Base system
   TITLE:=MESHdesk firmware
   URL:=http://radiusdesk.com/
endef


define Package/zzz-MESHdesk/description
MESHdesk is parrt of RADIUSdesk
endef

define Build/Compile
	rm -rf $(PKG_INSTALL_DIR)
	mkdir -p $(PKG_INSTALL_DIR)
endef

define Package/zzz-MESHdesk/install
   	$(INSTALL_DIR) $(1)/etc/MESHdesk
	$(INSTALL_DIR) $(1)/etc/MESHdesk/alfred_scripts
	$(INSTALL_DIR) $(1)/etc/MESHdesk/captive_portals
	$(INSTALL_DIR) $(1)/etc/MESHdesk/configs
	$(INSTALL_DIR) $(1)/etc/MESHdesk/files
	$(INSTALL_DIR) $(1)/etc/MESHdesk/libs
	$(INSTALL_DIR) $(1)/etc/MESHdesk/tests
	cp -r ./files/MESHdesk/alfred_scripts/* $(1)/etc/MESHdesk/alfred_scripts
	cp -r ./files/MESHdesk/captive_portals/* $(1)/etc/MESHdesk/captive_portals
	cp -r ./files/MESHdesk/configs/* $(1)/etc/MESHdesk/configs
	cp -r ./files/MESHdesk/files/* $(1)/etc/MESHdesk/files
	cp -r ./files/MESHdesk/libs/* $(1)/etc/MESHdesk/libs
	cp -r ./files/MESHdesk/tests/* $(1)/etc/MESHdesk/tests
	$(INSTALL_BIN) ./files/MESHdesk/a.lua $(1)/etc/MESHdesk/
	$(INSTALL_BIN) ./files/MESHdesk/actions_checker.lua $(1)/etc/MESHdesk/
	$(INSTALL_BIN) ./files/MESHdesk/batman_neighbours.lua $(1)/etc/MESHdesk/
	$(INSTALL_BIN) ./files/MESHdesk/heartbeat.lua $(1)/etc/MESHdesk/
	$(INSTALL_BIN) ./files/MESHdesk/hotplug_lan.lua $(1)/etc/MESHdesk/
	$(INSTALL_BIN) ./files/MESHdesk/led.lua $(1)/etc/MESHdesk/
	$(INSTALL_BIN) ./files/MESHdesk/main_led.lua $(1)/etc/MESHdesk/
	mkdir -p $(1)/etc/init.d
	$(INSTALL_BIN) ./files/MESHdesk/md_prerun $(1)/etc/init.d
	mkdir -p $(1)/etc/config
	$(INSTALL_DATA) ./files/MESHdesk/meshdesk $(1)/etc/config
	mkdir -p $(1)/etc/hotplug.d/iface
	cp ./files/MESHdesk/files/common/70-meshdesk $(1)/etc/hotplug.d/iface/
	mkdir -p $(1)/etc/alfred
	cp ./files/MESHdesk/alfred_scripts/alfred_meshdesk_scripts.sh $(1)/etc/alfred
	mkdir -p $(1)/etc/chilli/www
	cp ./files/MESHdesk/files/common/radiusdesk.html $(1)/etc/chilli/www
endef

define Package/zzz-MESHdesk/postinst
#!/bin/sh
exit 0
endef

define Package/zzz-MESHdesk/prerm
#!/bin/sh
# check if we are on real system
if [ -z "$${IPKG_INSTROOT}" ]; then
        echo "Removing rc.d symlink for MESHdesk"
        /etc/init.d/md_prerun disable
fi
exit 0
endef

$(eval $(call BuildPackage,zzz-MESHdesk))
