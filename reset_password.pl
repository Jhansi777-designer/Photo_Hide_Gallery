#!C:/Strawberry/perl/bin/perl.exe
use strict;
use warnings;
use CGI;
use JSON;
use Fcntl qw(:flock);

my $q = CGI->new;
print $q->header('application/json');

my $user = $q->param('user');
my $newpass = $q->param('newpass');

my $file = 'users.json';
my %users;

open my $fh, '<', $file;
flock($fh, LOCK_SH);
local $/;
%users = %{ decode_json(<$fh>) };
close $fh;

if ($users{$user}) {
    $users{$user}{password} = $newpass;
    delete $users{$user}{otp};
    open $fh, '>', $file;
    flock($fh, LOCK_EX);
    print $fh encode_json(\%users);
    close $fh;

    print encode_json({ status => 'success', message => 'Password reset successfully' });
} else {
    print encode_json({ status => 'error', message => 'User not found' });
}

